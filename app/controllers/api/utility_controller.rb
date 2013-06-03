# This controller offers services to clients that are not
# related to any particular model
# David Mah

class Api::UtilityController < Api::ApiController

  api :POST, '/utility/preview', "Preview some markdown"
  param :body, String, :required => true
  example "{\"body_markdown\":\"<p>example</p>\"}"
  def preview
    if params[:body].nil?
      render :json => error_object, :status => 400
    else
      render :json => {
        :body_markdown => MarkdownWriter.format_as_markdown(params[:body])
      }
    end
  end
end
