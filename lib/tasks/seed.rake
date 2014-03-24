task seed: :environment do 
  url = `heroku pgbackups:url`
  raise "URL copy failed!" if url.blank?

  Dir['temporarybackup*'].each do |backup|
    puts "Removing backup #{backup}"
    `rm #{backup}`
  end

  backup_name = "temporarybackup-#{Date.today.strftime('%Y-%m-%d')}.dump"
  `curl '#{url}' > #{backup_name}`

  puts "Dropping old db..."
  raise "Close database connections" unless `dropdb sashafklein_development`

  puts "Creating new db..."
  `createdb sashafklein_development`
  
  puts "Restoring..."
  `pg_restore --no-owner -c -d sashafklein_development #{backup_name} 2>&1`
  
  puts "Seed successful. Backup location: #{backup_name}"
end
