local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")

--stores all the messages in here
local ChatLogs = {}

--[[
Player Name -               Timestamp          -  message
serial id, John Smith,yyyy-mm-day Hour(military):Minutes:Seconds,message
--]]

-- Runs when a player joins the game
game.Players.PlayerAdded:Connect(function(player)
	--runs when that player types in the chat
	player.Chatted:connect(function(msg)
		--gets the current time on the server
		local CurrentTime = os.time()
		--formats the time to yyyy-mm-day Hour(military):Minutes:Seconds
		local Format = "%Y-%m-%d %X"
		--creates a dictionary to map all the required values
		local PlayerMessage = {
			--sets id to a randomly generated id and converts it to a string
			id = HttpService:GenerateGUID(false).."",
			--sets the player name
			player_name = player.Name,
			--sets the current time and applies the format
			timestamp = os.date(Format, CurrentTime),
			--sets the message the player sent
			msg = '"'..msg..'"'
		}
		--insert the dictionary into the array
		table.insert(ChatLogs, PlayerMessage)

	end)
end)

local function FormatData(data)
	--variable to store all the messages as a string
	local StringData = ''
	
	--iterate through each message
	for i, message in ipairs(data) do
		--iterate through the individual message
		for j, content in next, message do
			--concatenate the current message with the new piece of content
			StringData = StringData .. content .. ','
		end
		--when it's done, take the comma off the end
		StringData = string.sub(StringData, 1, -2)
		--add a new line to the string
		StringData = StringData .. '\n'
		
	end
	print(StringData)
	--send the string outside the function
	return StringData
end

local function GET()
	local response = HttpService:RequestAsync(
		{
			Url = "https://oba9hb0gr8.execute-api.us-west-1.amazonaws.com/gsdevbeta/RobloxChatLogs/Example.txt",
			Method = "GET",
			Headers = {
				["Content-Type"] = "text/plain",
				
			},
			
		}
	)
	if response.Success then
		print("Status code:", response.StatusCode, response.StatusMessage)
		--print("Response body:\n", response)
		--print("Data - " ,response.Body)
		return response.Body
	else
		print("The request failed:", response.StatusCode, response.StatusMessage)
	end
end

local function PUT(msg, filename)
	--sends a request to put a message to a file
	local response = HttpService:RequestAsync(
		{
			--the endpoint with the filename concatenated
			Url = "https://oba9hb0gr8.execute-api.us-west-1.amazonaws.com/gsdevbeta/RobloxChatLogs/"..filename,
			--the method
			Method = "PUT",
			--the header to describe the file
			Headers = {
				["Content-Type"] = "text/plain",
				
			},
			--the content in the file
			Body = msg
		}
	)
	--check if a response is successful
	if response.Success then
		--if yes then print status 200
		print("Status code:", response.StatusCode, response.StatusMessage)
		--print("Response body:\n", response)
		--print("Data - " ,response.Body)
	else
		--if no print status 500
		print("The request failed:", response.StatusCode, response.StatusMessage)
	end
end

--call when the server shuts down
game:BindToClose(function()
	--make a protected call incase if fails
	local success, message = pcall(function()
		--get the data and format it
		local data = FormatData(ChatLogs)
		--get the current time
		local CurrentTime = os.time()
		--set the file name to the current time
		local FileName = CurrentTime .. ".csv"
		--call the PUT request and input the data and the file name
		PUT(data, FileName)
		--say the server is closing
		print("Server closing . . .")
		--display the name of the file
		print("Data being sent to " .. FileName)
		
	end)
	--if it did fail
	if not success then
		--print failed
		print("Http Request failed:", message)
	end
end)











