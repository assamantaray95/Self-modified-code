//DRAG AND DROP MULTIPLE FILE UPLOAD START
let filesincluded = 0;
let filescompleted = 0;
let totalfiles = 0;
function formatFileSize(bytes) 
{ 
	if (typeof bytes !== "number")  
	{ 
		return "";
	}
	if (bytes >= 1000000000) 
	{
		return (bytes / 1000000000).toFixed(2) + " GB";
	} 
	if (bytes >= 1000000) 
	{
		return (bytes / 1000000).toFixed(2) + " MB";
	} 
	return (bytes / 1000).toFixed(2) + " KB";
}

$(document).ready(function (e) {
	$(document).on("click", ".upload-files-btn", function (e) {
		e.preventDefault();
		$("#dragDropFiles").find("#myfilesinput").click();
	});
	$("#myfilesinput").fileupload({
		autoUpload: true,
		dropZone: $("#myfilesinput").parents().eq(3),
		add: function (e, data) {
			let uploadBtnPointer = this;
			let fileUploaderPointer = $(uploadBtnPointer).parent().parent().parent();
			var uploadErrors = [];
			var start = 0;
			$(fileUploaderPointer).find(".fileupload-progress").removeClass("d-none");
			if ($(fileUploaderPointer).find("#dragDropFiles").find(".upl").length == 0) {
				$(fileUploaderPointer).find("#dragDropFiles").append('<div class="mt-2 upl text-success">Uploading...</div>');
			}
			if (uploadErrors.length > 0) {
				alert(uploadErrors.join("\n"));
				return false;
			} else {
				data.submit();
			}
			$(fileUploaderPointer).find(".fileupload-progress").find(".progress-bar").removeClass("bg-primary bg-danger bg-warning bg-success");
			$(fileUploaderPointer)
				.find(".progress-bar")
				.css("width", start + "%");
			filesincluded++;
			data.files[0].uploadID = "fileuploaded-" + filesincluded;
			//This area will contain file list and progress information.
			var tpl = $('<div class="working mb-3">' + '<div class="card card-body shadow-none mt-1 mb-0"></div><span></span></div>');
			// Append the file name and file size
			tpl.find("div").append(
				'<div class="fileupload-indiviual-file-info d-flex align-items-center"><span>File name: ' +
					data.files[0].name +
					'</span><span class="ms-auto">File size: ' +
					formatFileSize(data.files[0].size) +
					'</span></div><div class="progress progressbardiv-' +
					data.files[0].uploadID +
					'"><div class="progress-bar progress-bar-striped bg-success progress-bar-animated" style="border-radius: 0" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div>'
			);
			// Add the HTML to the UL element
			data.context = tpl.appendTo($("#fileList"));
			// Automatically upload the file once it is added to the queue
			var jqXHR = data.submit();
			totalfiles++;
			
		},
		progress: function (e, data) {
			let uploadBtnPointer = this;
			let fileUploaderPointer = $(uploadBtnPointer).parent().parent().parent();
			var progress = parseInt((data.loaded / data.total) * 100, 10);
			$(fileUploaderPointer).find(".fileupload-progress").addClass("show");
			$(fileUploaderPointer)
				.find(".progressbardiv-" + data.files[0].uploadID)
				.find(".progress-bar")
				.css("width", progress + "%");
			if (progress <= 25) {
				$(fileUploaderPointer)
					.find(".progressbardiv-" + data.files[0].uploadID)
					.find(".progress-bar")
					.removeClass("bg-success")
					.addClass("bg-danger");
			} else if (progress <= 50) {
				$(fileUploaderPointer)
					.find(".progressbardiv-" + data.files[0].uploadID)
					.find(".progress-bar")
					.removeClass("bg-success bg-danger")
					.addClass("bg-warning");
			} else if (progress <= 75) {
				$(fileUploaderPointer)
					.find(".progressbardiv-" + data.files[0].uploadID)
					.find(".progress-bar")
					.removeClass("bg-success bg-danger bg-warning")
					.addClass("bg-primary");
			} else if (progress <= 100) {
				$(fileUploaderPointer)
					.find(".progressbardiv-" + data.files[0].uploadID)
					.find(".progress-bar")
					.removeClass("bg-primary bg-danger bg-warning")
					.addClass("bg-success");
			}
			$(fileUploaderPointer)
				.find(".upl")
				.html("Uploading... (" + progress + ")%");
				// location.reload();
			},
		done: function (e, data) {
			
			let filesUploadedIdsArray = [];
			let filesUploadedIDString = "";
			let uploadBtnPointer = this;
			let fileUploaderPointer = $(uploadBtnPointer).parent().parent().parent();
			let oldFiles = $(fileUploaderPointer).find("#d_file_list").val();
			var jsonData = data.result;
			filescompleted++;
			
			if (totalfiles == filescompleted) {
				$(fileUploaderPointer).find(".upl").html('<i class="fas fa-check-circle me-1"></i> Selected files have been uploaded.');
				$(fileUploaderPointer).find(".fileupload-progress").removeClass("show");
				$(fileUploaderPointer).find(".progress").addClass("d-none");
			}
			$(fileUploaderPointer).find('.progressbardiv-' + data.files[0].uploadID).find(".progress-bar").css(
				"width",
				"0%"
			);
			filesUploadedIdsArray.push(jsonData.filepath);console.log(jsonData);console.log(jsonData.filepath);
			filesUploadedIDString = filesUploadedIdsArray.join();
			var filteredCommaDelimatedString = "";

			if (oldFiles != "") {
				filteredCommaDelimatedString = (oldFiles + "," + filesUploadedIDString).split(",").filter(function (item, pos, self) {
					return self.indexOf(item) == pos;
				});
				$(fileUploaderPointer).find("#d_file_list").val(filteredCommaDelimatedString);
			} else {
				filteredCommaDelimatedString = (filesUploadedIDString).split(",").filter(function (item, pos, self) {
					return self.indexOf(item) == pos;
				});
				$(fileUploaderPointer).find("#d_file_list").val(filteredCommaDelimatedString);
			}
			//  alert("ok");
		},
		maxPostSize: 1000000000,
		maxFileSize: 1000000000,
		maxChunkSize: 0,
	});
});
//DRAG AND DROP MULTIPLE FILE UPLOAD END