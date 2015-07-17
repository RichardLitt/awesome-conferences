require 'rubygems'
require 'rake'
require 'kramdown'
require 'yaml'
require 'time'
require 'nokogiri'
require 'open-uri'
require 'pry'

SOURCE = "."
CONFIG = {
  'version' => "0.0.1",
  'data-file' => File.join(SOURCE, 'conferences.yml'),
  'readme' => File.join(SOURCE, 'README.md'),
  'ignore-headers' => ['Resources',
                       'License',
                       'Other Lists',
                       'Call for Speakers',
                       'What makes a conference awesome?']
}

class Conference
  attr_accessor :name, :website, :twitter, :location, :tags

  def initialize(*args)
    @name = args[0][:name] if args[0][:name]
    @website = args[0][:website] if args[0][:website]
    @twitter = args[0][:twitter] if args[0][:twitter]
    @location = args[0][:location] if args[0][:location]
    @tags = args[0][:tags] if args[0][:tags]
  end

  def to_yaml
    { name: @name,
      website: @website,
      twitter: @twitter,
      location: @location,
      tags: @tags }.to_yaml
  end

  def to_s
    "#{@name}"
  end

  def ==(other)
    # Is this the best way to check for equality?
    # Maybe just the website?
    @website == other.website && @name == other.name
  end

  def update_from_readme_content(conference)
    @twitter = conference.twitter
    @location = conference.location
  end

  def Conference.extract_from_yaml(yaml)
    new(name: yaml[:name],
        website: yaml[:website],
        twitter: yaml[:twitter],
        location: yaml[:location],
        tags: yaml[:tags])

  end

  def Conference.extract_conference_from_readme_content(conf)
    twitter = conf.css('a')[1].text if conf.css('a').count > 1
    new(name: conf.css('a')[0].text,
        website: conf.css('a')[0]['href'],
        twitter: twitter || nil)
  end
end

# Usage: rake transfer
desc "Transfer from readme.md to conferences.yml while saving the current data"
task :transfer do

  conferences = YAML.load_stream(File.open(CONFIG['data-file'], 'a+'))
  conferences = conferences.map do |conference|
    Conference.extract_from_yaml conference
  end
  File.open(CONFIG['readme'],'r') do |file|
    readme = file.read
    readme_html = Kramdown::Document.new(readme).to_html
    readme_parsed = Nokogiri::HTML(readme_html)
    readme_parsed.css("h2, h3, h4").to_a.each do |item|
       # ignore anything that's not already on there
      unless CONFIG['ignore-headers'].include?(item.text)
        location = item.text
        item.next_element.css('li').to_a.each do |conf|
          conference = Conference.extract_conference_from_readme_content conf
          conference.location = location if location != "Conferences"
          unless conferences.include?(conference)
            conferences.push(conference)
          else
            ind = conferences.index(conference)
            conferences[ind].update_from_readme_content conference
          end
        end
      end
    end
  end

  File.open(CONFIG['data-file'], 'w') do |file|
    conferences.each do |conf|
      file.write(conf.to_yaml)
    end
  end
end # task :transfer
