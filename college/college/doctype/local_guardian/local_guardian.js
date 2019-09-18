// Copyright (c) 2019, mvit ise and contributors
// For license information, please see license.txt

frappe.ui.form.on("Local Guardian", {
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
	refresh_list: function(frm,cdt,cdn) {
		var faculty = frappe.model.get_doc(cdt,cdn);
		var start_usn = faculty.from
		var end_usn = faculty.to
		if(start_usn && end_usn){
			frm.call({
				doc: frm.doc,
				method: "update_student_list",
				args:{
					start_usn: start_usn,
					end_usn: end_usn
				}
			})
		}
	}
});