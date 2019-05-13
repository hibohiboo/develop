#!/usr/bin/python

# Copyright (c) 2017 Microsoft Corporation

ANSIBLE_METADATA = {
	'metadata_version': '1.1',
	'supported_by': 'community',
	'status': ['preview']
}

DOCUMENTATION = '''
---
module: mssql_login

short_description: Add logins to a SQL Server instance

description:
	- Add logins to a SQL Server instance.

version_added: "2.2"

author: Arnav Singh (@arsing)

options:
	name:
		description:
			- The name of the login to add
		required: true

	password:
		description:
			- The password of the login
		required: true

	roles:
		description:
			- The roles to add the login to
		required: false
		default: []

	login_port:
		description:
			- The TDS port of the instance
		required: false
		default: 1433

	login_name:
		description:
			- The name of the user to log in to the instance
		required: true

	login_password:
		description:
			- The password of the user to log in to the instance
		required: true

notes:
	- Requires the mssql-tools package on the remote host.

requirements:
	- python >= 2.7
	- mssql-tools
'''.replace('\t', '  ')

EXAMPLES = '''
# Create a login named 'foo' with password 'bar' and add it to sysadmin role
- mssql_login:
	name: foo
	password: bar
	roles:
		- sysadmin
	login_name: sa
	login_password: password
'''.replace('\t', '  ')

RETURN = '''
name:
	description: The name of the login that was added
	returned: success
	type: string
	sample: foo
'''.replace('\t', '  ')


from ansible.module_utils.basic import AnsibleModule
import subprocess

def main():
	module = AnsibleModule(
		argument_spec = dict(
			name = dict(required = True),
			password = dict(required = True, no_log = True),
			roles = dict(type = 'list', required = False, default = []),
			login_port = dict(required = False, default = 1433),
			login_name = dict(required = True),
			login_password = dict(required = True, no_log = True)
		)
	)

	name = module.params['name']
	password = module.params['password']
	roles = module.params['roles']
	login_port = module.params['login_port']
	login_name = module.params['login_name']
	login_password = module.params['login_password']

	sqlcmd(login_port, login_name, login_password, """
		IF EXISTS(
			SELECT * FROM sys.sql_logins WHERE name = {0}
		)
			ALTER LOGIN {1} WITH PASSWORD = {2}
		ELSE
			CREATE LOGIN {1} WITH
				PASSWORD = {2},
				DEFAULT_DATABASE = [master],
				CHECK_EXPIRATION = OFF,
				CHECK_POLICY = OFF
		;
	""".format(
		quoteName(name, "'"),
		quoteName(name, '['),
		quoteName(password, "'")
	))

	for role in roles:
		sqlcmd(login_port, login_name, login_password, """
			ALTER SERVER ROLE {0} ADD MEMBER {1}
		""".format(
			quoteName(role, '['),
			quoteName(name, '[')
		))

	module.exit_json(changed = True, name = name)

def sqlcmd(login_port, login_name, login_password, command):
	subprocess.check_call([
		'/opt/mssql-tools/bin/sqlcmd',
		'-S',
		"localhost,{0}".format(login_port),
		'-U',
		login_name,
		'-P',
		login_password,
		'-b',
		'-Q',
		command
	])

def quoteName(name, quote_char):
	if quote_char == '[' or quote_char == ']':
		(quote_start_char, quote_end_char) = ('[', ']')
	elif quote_char == "'":
		(quote_start_char, quote_end_char) = ("N'", "'")
	else:
		raise Exception("Unsupported quote_char {0}, must be [ or ] or '".format(quote_char))

	return "{0}{1}{2}".format(quote_start_char, name.replace(quote_end_char, quote_end_char + quote_end_char), quote_end_char)

if __name__ == '__main__':
	main()