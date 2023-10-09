<td data-title="File(s) Caption">
	<a href="#" class="filecaption" data-pk="<?php print $aCard[$i]['id'];?>" data-placement="left"><?php print $aCard[$i]['d_filecaption'];?></a>
</td>
$(document).ready(function() {
	$.fn.editable.defaults.mode = 'inline';     
	$('.filecaption').editable({
		name:  'filecaption',
		url:   'index.php?ID=54',  
	});
});
function  copyInsuranceCaptionUpdate(){
	$pk = $_POST['pk'];
	$value = $_POST['value'];
	$sQry   =  "UPDATE cda_copyinsurancecard SET d_filecaption=:d_filecaption WHERE id=:id";
	$oStmt  = $this->DB->prepare($sQry);
	$oStmt->bindParam(':d_filecaption', $value);
	$oStmt->bindParam(':id', $pk);
	$oStmt->execute();
}