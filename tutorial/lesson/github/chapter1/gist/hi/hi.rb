require 'sinatra'
require 'octokit'

set :bind, '0.0.0.0'
set :port, 8080
set :views, "."

get '/:username' do |username|
 user = Octokit.user username
 count = user.public_gists
 erb :index, locals:{ :count => count }
end