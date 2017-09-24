/**
 * New script file
 */

/*function onChangeAssetValue(changeAssetValue) {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    return getAssetRegistry('org.acme.biznet.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = changeAssetValue.newValue;
            return assetRegistry.update(asset);
        });
}*/


 /**
     * Place an order for a vehicle
     * @param {composers.financial.SendBill} newBill - the SendBill transaction
     * @transaction
     */
function SendBill(newBill) {
    var balanceDue = newBill.bill.amount;
  
  	var ID = newBill.bill.patientID;
  	console.log("HELLO");
    return getParticipantRegistry('composers.participants.Patient')
        .then(function(patientRegistry) {
      		console.log("OK");
      		return patientRegistry.get(ID).then(function(patient){
            	console.log("BBB");
      			patient.balanceDue += newBill.bill.amount;
     			newBill.bill.paid = false;
     			return patientRegistry.update(patient);
            })
    	})
}
 /**
     * Place an order for a vehicle
     * @param {composers.financial.PayBill} oldBill - the PayBill transaction
     * @transaction
     */
function PayBill(oldBill) {
    var balancePaid = oldBill.bill.amount;
  
  	var ID = oldBill.bill.patientID;
  	console.log("HELLO");
    return getAssetRegistry('composers.financial.HospitalMoneyPool')
        .then(function(assetRegistry) {
      		console.log("OK");
      		return assetRegistry.get(ID).then(function(moneypool){
            	console.log("BBB");
              	HospitalMoneyPool.moneypool += oldBill.bill.amount;
     			oldBill.bill.paid = true;
     			return patientRegistry.update(patient);
            })
    	})
    	.then(function(){getParticipantRegistry('composers.participants.Patient')
            .then(function(patientRegistry) {
                console.log("OK");
                return patientRegistry.get(ID).then(function(patient){
                    console.log("BBB");
                    patient.balanceDue -= oldBill.bill.amount;
                    return patientRegistry.update(patient);
                })
            })
         })
}