# A class to aid in making assets accessible by javascript frontend code
# https://gist.github.com/codebrew/1406349
module AssetsUtil

  def self.assets_url
    self.config["environments"][Rails.env]["assets"]
  end

  def self.server_host
    self.config["environments"][Rails.env]["host"]
  end

  # Returns a hash of the configuration
  def self.config
    @@config ||= YAML.load_file(File.join(Rails.root, 'config', 'assets.yml'))
    @@config
  end

  # Returns a list of image urls
  def self.images
    Dir.glob(Rails.root.join("app/assets/images/**/*.*")).map do |path|
      path.gsub(Rails.root.join("app/assets/images/").to_s, "")
    end
  end

end
