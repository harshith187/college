// Copyright (c) 2020, mvit ise and contributors
// For license information, please see license.txt

frappe.ui.form.on('Result', {
	usn: function(frm,cdt,cdn) {
		var student = frappe.model.get_doc(cdt,cdn);
		frm.call({
			method: "college.college.doctype.cr_information.cr_information.get_student_name",
			args : {
				usn : student.usn
			},
			callback: function(r){
				frappe.model.set_value(cdt,cdn,"name1",r.message)
			}
		})
	}
});
frappe.ui.form.on('Marks', {
	subject_code: function(frm,cdt,cdn) {
		var subject= frappe.model.get_doc(cdt,cdn);
		frappe.call({
			method: "college.college.doctype.result.result.get_subject_name",
			args:{
				subject_code:subject.subject_code
			},
			callback:function(r){
				frappe.model.set_value(cdt,cdn,"subject1",r.message)
			}		
	
		})
	},
	external_marks:function(frm,cdt,cdn){
		var marks=frappe.model.get_doc(cdt,cdn);
		frappe.model.set_value(cdt,cdn,"total",Number(marks.internal_marks)+Number(marks.external_marks))
			
	}
});
