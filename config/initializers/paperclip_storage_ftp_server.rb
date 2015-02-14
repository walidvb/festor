module Paperclip
  module Storage
    module Ftp
      class Server
        def establish_connection
          @connection = Net::FTP.new
          @connection.passive = true

          if ignore_connect_errors
            begin
              connect
            rescue SystemCallError => e
              Paperclip.log("could not connect to ftp://#{user}@#{host}:#{port} (#{e})")
              @connection = nil
              return
            end
          else
            connect
          end

          @connection.login(user, password)
        end
      end
    end
  end
end
