// Copyright (c) 2020, mvit ise and contributors
// For license information, please see license.txt

frappe.ui.form.on('Placements', {
	placement_officer_id: function(frm,cdt,cdn) {
		var faculty = frappe.model.get_doc(cdt,cdn);
		frm.call({
			method: "college.college.doctype.local_guardian.local_guardian.get_faculty_name",
			args:{
				faculty_id: faculty.placement_officer_id
			},
			callback: function(r){
				frappe.model.set_value(cdt,cdn,"placement_officer",r.message)
			}
		})
	}});

frappe.ui.form.on('Recruiter List', {
	recruiter: function(frm,cdt,cdn) {
		var recruiter = frappe.model.get_doc(cdt,cdn);
		frm.call({
			method: "college.college.doctype.recruiting_company.recruiting_company.get_Number_of_Students_Recruited",
			args:{
				company_name: recruiter.recruiter
			},
			callback: function(r){
				frappe.model.set_value(cdt,cdn,"number_of_students_recruited",r.message)
			}
		})
}});