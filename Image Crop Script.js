//IMAGE CROP MODAL CODE
//Multiple Signeture page need this function to identify which inputfield file uploaded
function fileOne(val) 
{
    if(val == 1)
    {
        $('#value').val("1");
    }
    if(val == 2)
    {
        $('#value').val("2");
    }
}
//Multiple Signeture page need this function to identify which inputfield file uploaded        
var $modal = $('#modal');
var image = document.getElementById('Modalimg');
var fileInput1 = document.getElementById('txtIndivisualSign');
var SingleSigneture = document.getElementById('singleSignature');
var cropper;
$("body").on("change", "#txtIndivisualSign, .image, #txtIndivisualSign1, #txtClientSign, #txtWitnessSign, #txtSignature8", function (e) {
    var files = e.target.files;
    var done = function (url) {
        image.src = url;
        $modal.modal('show');
    };
    var reader;
    var file;
    var url;
    if (files && files.length > 0) {
        file = files[0];
        if (URL) {
            done(URL.createObjectURL(file));
        } else if (FileReader) {
            reader = new FileReader();
            reader.onload = function (e) {
                done(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
});
$modal.on('shown.bs.modal', function () {
    cropper = new Cropper(image, {
        aspectRatio: 2,
        viewMode: 3,
        preview: '.preview',
        canvas: canvas
    });
}).on('hidden.bs.modal', function () {
    cropper.destroy();
    cropper = null;
});
$("#crop").click(function () {
    canvas = cropper.getCroppedCanvas({
        width: 305,
        height: 75,
    });
    canvas.toBlob(function (blob) {
    url = URL.createObjectURL(blob);
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
    var base64data = reader.result;
    var consumerID = $('#consumerID').val();
    var formName = $('#formName').val();
    var Value = $('#value').val();
    var singleSig = SingleSigneture ? true : false;
    // alert(Value);exit();
    $.ajax({
            url: "<?php echo $APP->BASEURL; ?>/nc/index.php?ID=750",
            type: 'POST',
            dataType: 'json',
            data: { 'croppedImageView': base64data, 'consumerID':consumerID, 'formName':formName },
            success: function (data) 
                {
                    $modal.modal('hide');
                    if (singleSig == true) 
                    {
                        $('#imgDisplay').removeClass('d-none');
                        $('#imgDisplay').html(data.file);
                        $("#txtFilePath").val(data.filePath);
                    } 
                    else 
                    {
                        if ((Value == 1) && (value != 2)) 
                        {
                            $('#imgDisplay').removeClass('d-none');
                            $('#imgDisplay').html(data.file);
                            $("#txtFilePath").val(data.filePath);
                        } 
                        else
                        {
                            $('#secDisplay').removeClass('d-none');
                            $('#secDisplay').html(data.file);
                            $("#secFilePath").val(data.filePath);
                        }
                    }
                },
                error: function (request, error) 
                {
                    console.log(error);
                }
            });
        }
    });
})
//IMAGE CROP MODAL CODE


//PHP Code for Cropped Image Handle And Water MArk
<?php
date_default_timezone_set('America/New_York');
$path =  DIRECTORY."/";
$folderPath = str_replace('\\', '/', $path);
if (!file_exists($folderPath)) {
    mkdir($folderPath, 0777, true);
}
$iConsumerID = $_POST['consumerID'];
$iCustomName = $_POST['formName'];
$sRand = date("Ymdhis");
$image_parts = explode(";base64,", $_POST['croppedImageView']);
$image_type_aux = explode("/", explode(":", $image_parts[0])[1]);
$image_type = $image_type_aux[1];
$image_base64 = base64_decode($image_parts[1]);
$sFileName = $folderPath.$iCustomName.$sRand.'-'.$iConsumerID.'.'.$image_type;
file_put_contents($sFileName, $image_base64);
if($sFileName){
    $syear = date("Y");
    $sMonth = date("m");
    $sDay = date("d");
    $sImageCopy = "../uploads/".$syear."/".$sMonth."/".$sDay."/";
    if (!file_exists($sImageCopy)) {
        mkdir($sImageCopy, 0777, true);
    }
    $mPath = $sImageCopy.$iCustomName.$sRand.'-'.$iConsumerID.'.'.$image_type;
    file_put_contents($mPath, $image_base64);
}
$sFile = '<img src="'.$mPath.'" alt="CroppedImage" id="croppedImageView" style="width:250px;height:90px;">';
//Water Mark Code
$originalImage = imagecreatefrompng($sFileName);
$watermarkText = date("M j, Y g:i A");
$fontSize = 3;
$textColor = imagecolorallocate($originalImage, 0, 0, 0);
$textX = imagesx($originalImage) - (strlen($watermarkText) * imagefontwidth($fontSize)) - 0;
$textY = imagesy($originalImage) - $fontSize - 10;
imagestring($originalImage, $fontSize, $textX, $textY, $watermarkText, $textColor);
imagepng($originalImage, $sFileName);
imagedestroy($originalImage);
//Water Mark Code
$data['file'] = $sFile;
$data['filePath'] = $sFileName;
echo json_encode($data);
?>



