import React, { useState, useMemo } from 'react';
import { composerize, MessageType } from 'composerize-ts';
import { withDefaultOnError } from '../utils/defaults';
import { useDownloadFileFromBase64 } from '../hooks/useDownloadFileFromBase64';
import { textToBase64 } from '../utils/base64';

export default function DockerRunToDockerComposeConverter() {
  const [dockerRun, setDockerRun] = useState(
    'docker run -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --restart always --log-opt max-size=1g nginx'
  );

  const conversionResult = useMemo(() => {
    return withDefaultOnError(() => composerize(dockerRun.trim()), { yaml: '', messages: [] });
  }, [dockerRun]);

  const dockerCompose = conversionResult.yaml;
  const notImplemented = conversionResult.messages
    .filter(msg => msg.type === MessageType.notImplemented)
    .map(msg => msg.value);
  const notComposable = conversionResult.messages
    .filter(msg => msg.type === MessageType.notTranslatable)
    .map(msg => msg.value);
  const errors = conversionResult.messages
    .filter(msg => msg.type === MessageType.errorDuringConversion)
    .map(msg => msg.value);

  const dockerComposeBase64 = `data:application/yaml;base64,${textToBase64(dockerCompose)}`;
  const { download } = useDownloadFileFromBase64({ source: dockerComposeBase64, filename: 'docker-compose.yml' });

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="dockerRun" className="block text-gray-700 font-medium mb-2">Your docker run command:</label>
        <textarea
          id="dockerRun"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          value={dockerRun}
          onChange={e => setDockerRun(e.target.value)}
          rows={3}
          placeholder="Your docker run command to convert..."
          style={{ fontFamily: 'monospace' }}
        />
      </div>

      <hr className="my-4" />

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Docker Compose YAML:</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-purple-500"
          readOnly
          value={dockerCompose}
          rows={10}
          style={{ fontFamily: 'monospace' }}
        />
      </div>

      <div className="flex justify-center mb-5">
        <button
          className={`px-6 py-3 rounded-lg text-white ${dockerCompose ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!dockerCompose}
          onClick={download}
        >
          Download docker-compose.yml
        </button>
      </div>

      {notComposable.length > 0 && (
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg mt-5">
          <h3 className="font-bold">These options are not translatable to docker-compose:</h3>
          <ul className="list-disc list-inside">
            {notComposable.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {notImplemented.length > 0 && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mt-5">
          <h3 className="font-bold">These options are not yet implemented:</h3>
          <ul className="list-disc list-inside">
            {notImplemented.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-5">
          <h3 className="font-bold">The following errors occurred:</h3>
          <ul className="list-disc list-inside">
            {errors.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
