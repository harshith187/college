# -*- coding: utf-8 -*-
# Copyright (c) 2019, mvit ise and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class LocalGuardian(Document):
	def validate(self):
		self.name1 = get_faculty_name(self.faculty_id)
			
	def update_student_list(self,start_usn,end_usn,old_data):
		new_students = frappe.db.sql("""select name from `tabStudent` where usn between "{0}" and "{1}" """.format(start_usn,end_usn),as_dict=1)
		usn_list = []
		if(old_data):
			for row in old_data:
				usn_list.append(row['usn'])
			for student in new_students:
				student_details = frappe.get_doc("Student",student.name)
				if student_details.usn not in usn_list:
					self.append("student_list",update_student_data(student_details))
		else:
			for student in new_students:
				student_details = frappe.get_doc("Student",student.name)
				self.append("student_list",update_student_data(student_details))

def update_student_data(student_details):
	new_student_entry = frappe.new_doc("Basic Student Information")
	new_student_entry.usn = student_details.usn
	new_student_entry.name1 = " ".join(filter(None,[student_details.first_name,student_details.middle_name,student_details.last_name]))
	new_student_entry.email_id = student_details.student_email_id
	new_student_entry.mobile_number = student_details.student_mobile_number
	return new_student_entry

@frappe.whitelist()
def get_faculty_name(faculty_id):
	faculty = frappe.get_doc("Faculty",faculty_id)
	return faculty.faculty_name

