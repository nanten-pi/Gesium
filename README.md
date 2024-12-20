<div id="top"></div>

## 使用技術一覧

<!-- シールド一覧 -->
<!-- 該当するプロジェクトの中から任意のものを選ぶ-->
<p style="display: inline">
  <!-- フロントエンドのフレームワーク一覧 -->
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Next.js-000000.svg?logo=next.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-TailwindCSS-000000.svg?logo=tailwindcss&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAF">
  <!-- インフラ一覧 -->
  <img src="https://img.shields.io/badge/-githubactions-FFFFFF.svg?logo=github-actions&style=for-the-badge">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

## プロジェクト名

Gesium

<!-- プロジェクトについて -->

## プロジェクトについて

CesiumとNode.jsを利用した地学に役立ちそうなツールキット

<!-- プロジェクトの概要を記載 -->
<!--
  <p align="left">
    <br />
    <!-- プロジェクト詳細にWikiのリンク 
    <a href="Backlogのwikiリンク"><strong>プロジェクト詳細 »</strong></a>
    <br />
    <br />
<p align="right">(<a href="#top">トップへ</a>)</p>
-->
## 環境

<!-- 言語、フレームワーク、ミドルウェア、インフラの一覧とバージョンを記載 -->

| 言語・フレームワーク  | バージョン |
| --------------------- | ---------- |
| Node.js               | 18.18.0   |
| React                 | 18.2.0     |
| Next.js               | 14.2.15     |
| Cesium                | 1.98.1     |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

<!-- Treeコマンドを使ってディレクトリ構成を記載 -->
├── data
├── pages
├── public
|   ├── cesium
├── src
|   ├── MapLayer
|   ├── Setting
|   ├── Temp

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

### 開発環境セットアップ
```
npm install
//ここでエラーが出た場合
npm audit fix
```

続いてのコマンドは

#### あなたがWindowsの場合
```
mklink /D "GesiumをインストールしたディレクトリのパスをC:から置き換えてください"\public\cesium "GesiumをインストールしたディレクトリのパスをC:から置き換えてください"\node_modules\cesium\Build\Cesium
```

#### あなたがUnix系を使っている場合
```
ln -s ../node_modules/cesium/Build/Cesium public/cesium
```
これで完了です

### コマンド一覧
```
npm run dev #実行します
```
## トラブルシューティング

### Module Not Found

Gesiumのrootディレクトリでnpm installを実行

<p align="right">(<a href="#top">トップへ</a>)</p>
