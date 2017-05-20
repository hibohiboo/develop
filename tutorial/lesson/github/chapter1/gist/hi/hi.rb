require 'sinatra'
require 'octokit'

ENV["SSL_CERT_FILE"] = "./cacert.pem"

set :views, "."

get '/:username' do |username|
 user = Octokit.user username
 count = user.public_gists
 erb :index, locals:{ :count => count }
end