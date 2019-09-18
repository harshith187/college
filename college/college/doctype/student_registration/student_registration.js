// Copyright (c) 2019, mvit ise and contributors
// For license information, please see license.txt

frappe.ui.form.on('Student Registration', {
	usn: function(frm,cdt,cdn) {
		var student = frappe.model.get_doc(cdt,cdn);
		frm.call({
			method: "college.college.doctype.cr_information.cr_information.get_student_name",
			args : {
				usn : student.usn
			},
			callback: function(r){
				frappe.model.set_value(cdt,cdn,"student_name",r.message)
			}
		})
	},
	
	before_save: function(frm,cdt,cdn) {
		var student_registration_details = frappe.model.get_doc(cdt,cdn);
		if(student_registration_details.fee_status == "Pending") {
			frappe.throw("Changes can't be saved as the payment status is pending");
			frappe.validated = false;
		}
	}
});
