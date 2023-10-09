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