require 'spec_helper'

describe Reorder do 

  before do
    0.upto(2) do |n|
      PortfolioItem.create(title: n, order: n)
    end
    expect( titles ).to eq %W( 0 1 2 )
  end

  it "inserts normally" do
    Reorder.new( PortfolioItem.all ).insert_a_before_b!( PortfolioItem.last, PortfolioItem.find_by(order: 1) )
    expect( titles ).to eq %W( 0 2 1 )
  end

  it "inserts before end" do
    Reorder.new( PortfolioItem.all ).insert_a_before_b!( PortfolioItem.first, PortfolioItem.last )
    expect( titles ).to eq %W( 1 0 2 )
  end

  it "inserts to beginning" do
    Reorder.new( PortfolioItem.all ).insert_a_before_b!( PortfolioItem.last, PortfolioItem.first )
    expect( titles ).to eq %W( 2 0 1 )
  end

  it "collapses after" do
    PortfolioItem.last.update_attributes!(order: 5)
    expect(PortfolioItem.last.order).to eq 5

    Reorder.new( PortfolioItem.all ).insert_a_before_b!( PortfolioItem.last, PortfolioItem.first )
    expect( titles ).to eq %W( 2 0 1 )
    expect( PortfolioItem.ordered.pluck(:order) ).to eq [0, 1, 2]
  end

  def titles
    PortfolioItem.ordered.pluck(:title)
  end
end