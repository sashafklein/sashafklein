# == Schema Information
#
# Table name: emails
#
#  id         :integer          not null, primary key
#  subject    :string(255)
#  content    :string(255)
#  name       :string(255)
#  address    :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'spec_helper'

describe Email do
  pending "add some examples to (or delete) #{__FILE__}"
end
