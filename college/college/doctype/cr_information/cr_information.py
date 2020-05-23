# -*- coding: utf-8 -*-
# Copyright (c) 2019, mvit ise and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class CRInformation(Document):
	pass

@frappe.whitelist()
def get_student_name(usn):
	student_details = frappe.get_doc("Student",usn)
	return " ".join(filter(None,[student_details.first_name,student_details.middle_name,student_details.last_name]))
