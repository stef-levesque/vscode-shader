'use strict';
import { Uri, workspace } from 'vscode';
import { HTML_TEMPLATE } from './html';
import { https } from 'follow-redirects';

export const replaceLinks = (node: any, dom: any, uri: Uri) => {
    let num = node.getElementsByTagName('a').length;
    for (let i = 0; i < num; ++i) {
        const href = node.getElementsByTagName('a')[i].href;
        const fulllink = new dom.window.URL(href, uri.toString()).href;
        node.getElementsByTagName('a')[i].href = '#';
        node.getElementsByTagName('a')[i].setAttribute('onclick', `clickLink('${fulllink}')`);
    }
}

export function getWebviewContent(link: string, prepareHtmlForTemplate: (uri: Uri, html: string) => string): Promise<string> {
    const uri = Uri.parse(link);
    return new Promise<string>((resolve, reject) => {
        let request = https.request({
            host: uri.authority,
            path: uri.path,
            rejectUnauthorized: workspace.getConfiguration().get("http.proxyStrictSSL", true)
        }, (response) => {
            if (response.statusCode == 301 || response.statusCode == 302)
                return resolve(response.headers.location);
            if (response.statusCode != 200)
                return resolve(response.statusCode.toString());
            let html = '';
            response.on('data', (data) => { html += data.toString(); });
            response.on('end', () => {
                const topic = prepareHtmlForTemplate(uri, html);
                resolve(HTML_TEMPLATE.replace('{0}', topic));
            });
            response.on('error', (error) => { console.log(error); });
        });
        request.on('error', (error) => { console.log(error); });
        request.end();
    });
}
