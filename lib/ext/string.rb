class String
	def unindent; gsub(/^#{scan(/^\s+/).min}/, "") end
end