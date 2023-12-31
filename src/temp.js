app.post('/test/bedrock', async (req, res) => {
    try {
      const params = {
        modelId: "anthropic.claude-v2",
        contentType: "application/json",
        accept: "application/json",
        body: JSON.stringify({
          prompt: "\n\nHuman: Write me a long story about bugs making bread.\n\nAssistant:",
          max_tokens_to_sample: 2048,
          temperature: 0.5,
          top_k: 250,
          top_p: 1,
          stop_sequences: [
            "\n\nHuman:"
          ],
          anthropic_version: "bedrock-2023-05-31"
        })
      };
      const bedrockResult = await bedrock.invokeModel(params).promise();
      const buffer = Buffer.from(bedrockResult.body);
  
      // Convert the buffer to a string
      const responseString = buffer.toString('utf-8');
      const responseJSON = JSON.parse(responseString);
      const response = responseJSON.completion;
    return res.json({status: 'success', message: response});
    }
      catch(error){
      console.error("Error:", error);
      return res.status(407).json({ message: "Error querying ingredients", error: error });
    };
  })