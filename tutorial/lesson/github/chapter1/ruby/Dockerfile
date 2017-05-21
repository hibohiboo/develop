FROM ruby:2.4.1
WORKDIR /home
RUN apt-get update
RUN apt-get install -y jq
RUN gem install gist -f --no-document --no-ri
WORKDIR /home/gist/hi
COPY Gemfile /home/gist/hi/
RUN bundle && bundle clean
