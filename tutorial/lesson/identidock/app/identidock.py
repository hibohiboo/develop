from flask import Flask
app = Flask(__name__)
default_name = 'Joe'

@app.route('/')
def get_identicon():

    name = default_name

    header = '<html><head><title>identidock</title></head><body>'
    body = '''<form method="POST">
              Hello <input type="text" name="name" value="{}">
              <input type="submit" value="submit">
              </form>
              <p> you look like a:
              <img src="/monster/monster.png" />
              '''.format(name)
    footer = '</body></html>'

    return header + body + footer

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
