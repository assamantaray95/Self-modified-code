function uploadByDragDrop()
	{
		$aUploadedFileId = array();
		if(!empty($_FILES["myfilesinput"]['name']))
		{
			$sUploadName = $_FILES["myfilesinput"]['name'];
			$aFileAry = explode(".", $sUploadName);
			$sFileExt 		= array_pop($aFileAry);
			// $sFileName 	= uniqid().'.'.$sFileExt;
			$sBaseName = basename($_FILES["myfilesinput"]["name"]);
			$sFileExtension = strtolower(pathinfo($sBaseName, PATHINFO_EXTENSION));
			$iFileSize = $_FILES["myfilesinput"]['size'];
			if($iFileSize)
			{
				/*Get the actual file name without extension of the uploaded file.*/
				$sTempName = pathinfo($sBaseName, PATHINFO_FILENAME);
				$sExtension = $sFileExtension;
				$sUploadName = ''.uniqid().'.'.$sExtension;
				$sTmpFileName = $_FILES["myfilesinput"]['tmp_name'];
				$iPersonnelID        = $_POST['consumerid'];
				$sDirPath = $this->_createUserFileDirPath($iPersonnelID);
				if($sDirPath == '')
				{
					$sDirPath = $iPersonnelID.'/'.date("Y").'/'.date("m").'/'.date("d").'/'.$sUploadName;
					if (!file_exists ($sDirPath) )
					{
						mkdir($sDirPath,0755,true);
					}
				}
				$sFileOrigPath = $sDirPath.'/'.$sUploadName;
				// Upload file through chunk
				$fileName = isset($_REQUEST["name"]) ? $_REQUEST["name"] : $_FILES["myfilesinput"]["name"];
				$filePath = $sFileOrigPath;
				$chunk = isset($_REQUEST["chunk"]) ? intval($_REQUEST["chunk"]) : 0;
				$chunks = isset($_REQUEST["chunks"]) ? intval($_REQUEST["chunks"]) : 0;
				$out = @fopen("{$filePath}.part", $chunk == 0 ? "wb" : "ab");
				if ($out) 
				{
					$in = @fopen($_FILES['myfilesinput']['tmp_name'], "rb");
					if ($in) 
					{
						while ($buff = fread($in, 4096))
						{ 
							fwrite($out, $buff); 
						}
					} else {
					// Failed to open output stream
					}
					@fclose($in);
					@fclose($out);
					@unlink($_FILES['myfilesinput']['tmp_name']);
				} else {
						// Failed to open output stream
						}
				if (!$chunks || $chunk == $chunks - 1) 
				{
					rename("{$filePath}.part", $filePath);
				}
				$filePath = $sFileOrigPath;
				$sFileUploadDir = $sBaseName;
				$sFileUploadPath = $sFileUploadDir.'/'.$sUploadName;
				if($sFileUploadPath == '')
				{
					$sFileUploadPath = '/'.date("Y").'/'.date("m").'/'.date("d").'/'.$sUploadName;
				}
			}
			array_push($aUploadedFileId,$sFileUploadPath);
		}
		return $aUploadedFileId;
	}