# frozen_string_literal: true
#
# Jekyll plugin: adds `silence_deprecations` support to jekyll-sass-converter.
# Identical to NestNinja.uk — patches Scss converter to forward
# silence_deprecations from _config.yml to Dart Sass.
#
module SassSilenceDeprecations
  def sass_configs
    configs = super
    ids     = jekyll_sass_configuration.fetch("silence_deprecations", [])
    return configs if ids.empty?

    configs.merge(silence_deprecations: ids)
  end
end

Jekyll::Converters::Scss.prepend(SassSilenceDeprecations)
