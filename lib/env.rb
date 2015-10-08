class Env
  def self.method_missing(m)
    self[m]
  end

  def self.[](key)
    ENV[key.to_s.downcase] || ENV[key.to_s.upcase]
  end
end