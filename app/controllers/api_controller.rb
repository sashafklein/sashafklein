class ApiController < ApplicationController
  skip_before_filter :verify_authenticity_token

  respond_to :json

  private

  def permission_denied_error
    error(403, 'Permission Denied!')
  end

  def error(status: 500, message: 'Something went wrong', meta: {}, line: nil)
    response = {
      response_type: "ERROR",
      message: message,
      meta: meta,
      error: true,
      controller: self.class.to_s,
      line: line,
      code: status,
      params: params.except(:controller, :action).to_json
    }

    render json: response.to_json, status: status
  end
end
