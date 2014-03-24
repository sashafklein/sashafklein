require 'net/http'
require 'uri'

class Tweet

  attr_accessor :msg, :link
  def initialize(string, link)
    @msg = string
    @link = link
  end

  def send_if_production!
    return unless  Rails.env.production?

    Twitter.update(full_message)
  end

  private
  
  def full_message
    [msg, link].join(" -- ")
  end
end