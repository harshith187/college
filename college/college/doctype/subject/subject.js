// Copyright (c) 2020, mvit ise and contributors
// For license information, please see license.txt

frappe.ui.form.on("Subject", {
	faculty_id: function(frm,cdt,cdn) {
		var faculty = frappe.model.get_doc(cdt,cdn);
		frm.call({
			method: "college.college.doctype.local_guardian.local_guardian.get_faculty_name",
			args:{
				faculty_id: faculty.faculty_id
			},
			callback: function(r){
				frappe.model.set_value(cdt,cdn,"name1",r.message)
			}
		})
	},
});
