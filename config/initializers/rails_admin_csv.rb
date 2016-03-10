# encoding: UTF-8
require 'csv'

module RailsAdmin
  class CSVConverter

    def generate_csv_row(object)
      @fields.collect do |field|
        field.with(object: object).export_value
      end +
        @associations.flat_map do |association_name, option_hash|
          associated_objects = [object.send(association_name)].flatten.compact
          option_hash[:fields].collect do |field|
            associated_objects.collect do |ao|
              result = field.with(object: ao).export_value.presence || @empty
              if result.class == String
                remove = %w{&nbsp;
[image]
[image:flip]
,[image]
[info]}
                ActionView::Base.full_sanitizer.sanitize(result).gsub('&nbsp;', ' ').gsub(/(\[(?:info|image):?\w*\])/, '').gsub(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/, '')
              else
                result
              end
            end.join(',')
          end
        end

    end
  end
end
