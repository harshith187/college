import frappe
from frappe import _

@frappe.whitelist()
def send_mails(local_guardian):
    local_guardian = frappe.get_doc("Local Guardian",local_guardian)
    local_guardian.check_permission("email")
    frappe.sendmail(
        recipients = [student.email_id for student in local_guardian.student_list],
        sender = frappe.session.user,
        subject = local_guardian.subject,
        message = local_guardian.message,
        reference_doctype = local_guardian.doctype,
        reference_name = local_guardian.name,
    )

    frappe.msgprint(_("Message sent"))

