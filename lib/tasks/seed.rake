task seed: :environment do 
  url = `heroku pgbackups:url`
  return "URL copied incorrectly!" if url.blank?

  Dir['temporarybackup*'].each do |backup|
    `rm #{backup}`
  end

  backup_name = "temporarybackup-#{Date.today.strftime('%Y-%m-%d')}.dump"
  `curl #{url} > #{backup_name}`

  puts "dropping db..."
  `dropdb sashafklein_development`

  puts "adding new db..."
  `createdb sashafklein_development`
  `pg_restore --no-acl --no-owner -d sashafklein_development #{backup_name}`

  `pg_restore #{backup_name}`
  puts "Seed successful. Backup location: #{backup_name}"
end
