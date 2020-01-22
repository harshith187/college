# -*- coding: utf-8 -*-
# Copyright (c) 2019, mvit ise and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class LocalGuardian(Document):
	def validate(self):
		self.name1 = get_faculty_name(self.faculty_id)


	def update_student_list(self,start_usn,end_usn):
		students = frappe.db.sql("""select name from `tabStudent` where name between'{0}' and '{1}'""".format(start_usn,end_usn),as_dict=1)
		for student in students:
			student_details = frappe.get_doc("Student",student.name)
			new_student_entry = frappe.new_doc("Basic Student Information")
			new_student_entry.usn = student_details.usn
			new_student_entry.name1 = " ".join(filter(None,[student_details.first_name,student_details.middle_name,student_details.last_name]))
			new_student_entry.email_id = student_details.student_email_id
			new_student_entry.mobile_number = student_details.student_mobile_number
			self.append("student_list",new_student_entry)
			
		
@frappe.whitelist()
def get_faculty_name(faculty_id):
	faculty = frappe.get_doc("Faculty",faculty_id)
	return faculty.faculty_name

