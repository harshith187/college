// Copyright (c) 2019, mvit ise and contributors
// For license information, please see license.txt

frappe.ui.form.on('CR Information', {
	usn: function(frm,cdt,cdn) {
		var student = frappe.model.get_doc(cdt,cdn);
		frm.call({
			method: "college.college.doctype.cr_information.cr_information.get_student_name",
			args:{
				usn: student.usn
			},
			callback: function(r){
				frappe.model.set_value(cdt,cdn,"name1",r.message)
			}
		})
	},
});
