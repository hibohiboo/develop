import sys
import os
import shlex

# マークダウンが使用できるように設定
import recommonmark
from recommonmark.parser import CommonMarkParser

source_parsers = {
    '.md': CommonMarkParser
}

source_suffix = ['.rst', '.md']

extensions = []

# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The master toctree document.
master_doc = 'index'

# Usually you set "language" from the command line for these cases.
language = 'ja'
# directories to ignore when looking for source files.
exclude_patterns = []

# The name of the Pygments (syntax highlighting) style to use.
pygments_style = 'sphinx'

# If true, `todo` and `todoList` produce output, else they produce nothing.
todo_include_todos = False

# -- Options for HTML output ----------------------------------------------

# a list of builtin themes.
html_theme = 'alabaster'
html_static_path = ['_static']
