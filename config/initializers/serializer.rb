ActiveSupport.on_load(:active_model_serializers) do
  # This removes the 'root' level key in json output.
  # For instance {'course':{------}} instead becomes {-------}
  # This is more concise, and the data should be implied by the URL
  # used to retrieve it anyway
  ActiveModel::ArraySerializer.root = false
  ActiveModel::Serializer.root = false
end
