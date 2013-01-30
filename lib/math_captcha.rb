require 'ezcrypto'

  class MathCaptcha
    CIPHER_KEY  = "secret key"
    CIPHER_SALT = "secret salt"

    attr_reader :a, :b, :operator

    def initialize
      @a        = (1..10).to_a.sample
      @b        = (1..10).to_a.sample
      @operator = [:+, :*].sample
    end

    def initialize_from(secret)
      yml = YAML.load(key.decrypt64(secret))
      @a, @b, @operator = yml[:a], yml[:b], yml[:operator]
    end

    def correct?(value)
      result == value.to_i
    end

    def encrypt
      key.encrypt64 to_yaml
    end

    def self.decrypt(secret)
      result = new
      result.initialize_from secret
      result
    end

    def question
      @word_op = "plus" if @operator == :+
      @word_op = "times" if @operator == :*
      "#{@a} #{@word_op} #{@b} = ?"
    end

  protected

    def to_yaml
      YAML::dump({
        :a        => @a,
        :b        => @b,
        :operator => @operator
      })
    end

  private

    def key
      EzCrypto::Key.with_password CIPHER_KEY, CIPHER_SALT
    end

    def result
      @a.send @operator, @b
    end
  end