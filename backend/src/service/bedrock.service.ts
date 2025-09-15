import { BedrockRuntimeClient, InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { config } from '../config/server.config';

const bedrock_client = new BedrockRuntimeClient({
    region: config.aws_region,
    credentials: {
        accessKeyId: config.aws_access,
        secretAccessKey: config.aws_secret,
    },
});

const modelId = "us.anthropic.claude-3-5-haiku-20241022-v1:0"
// const modelId = "anthropic.claude-3-sonnet-20240229-v1:0"
// const modelId = "anthropic.claude-3-5-sonnet-20240620-v1:0"

export const bedrockClient = {
    /**
     * Standard completion
     */
    async invoke(prompt: string): Promise<{ message: string | null }> {
        // Prepare the payload for the model
        const payload = {
            anthropic_version: "bedrock-2023-05-31",
            max_tokens: 10000,
            messages: [
                {
                    role: "user",
                    content: [{ type: "text", text: prompt }],
                },
            ],
        };

        // Invoke Claude
        const command = new InvokeModelCommand({
            contentType: "application/json",
            body: JSON.stringify(payload),
            modelId,
        });

        const apiResponse = await bedrock_client.send(command);

        // Decode the response
        const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
        const responseBody = JSON.parse(decodedResponseBody);

        // Extract the text
        const message = responseBody?.content?.[0]?.text ?? null;

        return { message };
    }

};