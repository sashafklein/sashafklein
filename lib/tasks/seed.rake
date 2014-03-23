task seed: :environment do 
  url = `heroku pgbackups:url`
  puts "URL: #{url}"
  
  Dir['temporarybackup*'].each do |backup|
    `rm #{backup}`
    puts "removed #{backup}"
  end

  backup_name = "temporarybackup-#{Date.today.strftime('%Y-%m-%d')}.dump"

  puts "backup_name: #{backup_name}"
  `curl '#{url}' > #{backup_name}`
  `pg_restore #{backup_name}`
end
