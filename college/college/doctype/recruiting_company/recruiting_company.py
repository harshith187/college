# -*- coding: utf-8 -*-
# Copyright (c) 2020, mvit ise and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Recruitingcompany(Document):
	pass

@frappe.whitelist()
def get_Number_of_Students_Recruited(company_name):
	company = frappe.get_doc("Recruiting company",company_name)
	return company.number_of_students_recruited