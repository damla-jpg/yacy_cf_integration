# starting with port 8090 run 10 times docker run -d -p port:port yacy/yacy_search_server

$port = 8092
$end = $port 

for ($i = $port; $i -lt $end; $i++) {
    $command = "docker run -d -p ${i}:${i} yacy/yacy_search_server"
    # print command
    # $command
    Invoke-Expression $command
}

# get list of running containers and save in variable
$containers = docker ps -q
# print containers
# $containers


# for each container open the yacy conf file in path opt/yacy_search_server/DATA/SETTINGS/yacy.conf
# and find the line that says "port=" and replace it with the port number of the container
foreach ($container in $containers) {
    $port = docker port $container | Select-String -Pattern '\d{4,5}' -AllMatches | ForEach-Object { $_.Matches.Value }
    $port[0]
    $path = "\opt\yacy_search_server\DATA\SETTINGS\yacy.conf"
    
    $command = "cd ${path}"
    # Invoke-Command "docker exec -it $container sed -i 's/port=8090/port=${port[0]}/g' $path"

    # $content = Get-Content $path
    # $content | ForEach-Object { $_ -replace 'port=8090', "port=${port}" } | Set-Content $path
}