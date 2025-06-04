# 项目环境配置指南

### 项目背景

在本项目中，我们从头开始配置了一个用于移动端开发的前端环境。这个环境包括了 Expo、Git 和 Node.js 的安装，并且帮助你通过 `npx` 初始化一个新的 Expo 项目。以下是详细的配置步骤和在过程中遇到的问题及解决方案。

---

### 1. 环境配置准备

#### 1.1 安装 Node.js

* **问题**：没有安装 Node.js，导致无法使用 `npm` 或 `npx` 命令。
* **解决方案**：

  * 访问 [Node.js 官网](https://nodejs.org/)，下载并安装 LTS 版本。
  * 安装过程中，确保勾选 **“Add to PATH”** 选项，使得 Node.js 和 npm 可以在命令行中使用。

**验证是否成功安装 Node.js**：

```bash
node -v
npm -v
```

如果这两个命令返回版本号，说明 Node.js 和 npm 安装成功。

---

#### 1.2 安装 Git

* **问题**：没有安装 Git，导致无法使用 `git clone` 命令拉取项目。
* **解决方案**：

  * 访问 [Git 官网](https://git-scm.com/)，下载并安装 Git。
  * 在安装过程中，确保选择 **"Git from the command line and also from 3rd-party software"** 选项，以便能在命令行中使用 Git。

**验证是否成功安装 Git**：

```bash
git --version
```

如果成功，命令会返回 Git 版本号。

---

### 2. 配置 Expo 环境

#### 2.1 安装 Expo CLI（旧版方式）

* **问题**：Expo CLI 的全局版本已经被弃用，Expo 推荐使用 `npx` 来代替全局安装的 Expo CLI。
* **解决方案**：

  * 在安装过程中，我们注意到 Expo CLI 已不推荐全局安装，而是建议使用 `npx` 来临时运行 Expo CLI。我们使用了 `npx` 来代替全局安装的 `expo-cli`，这样每次执行时都会使用项目本地的 Expo CLI。

#### 2.2 使用 `npx` 初始化项目

1. 使用 `npx` 创建一个新的 Expo 项目：

   ```bash
   npx create-expo-app Frontend-Version1
   ```
2. 在执行时，系统会提示选择模板：

   * `blank`：空模板，适合从头开始。
   * `tabs`：带有导航的多个页面示例，适合需要底部导航的项目。
3. 选择完模板后，Expo 会自动创建项目并安装依赖。

**进入项目目录**：

```bash
cd Frontend-Version1
```

---

### 3. 启动开发服务器

* 进入项目目录后，使用 `npx` 启动 Expo 开发服务器：

  ```bash
  npx expo start
  ```

  这个命令会启动开发服务器，并在命令行中显示一个二维码。你可以使用 **Expo Go** 应用扫描二维码，在手机上实时查看项目效果。

---

### 4. 可能遇到的问题和解决方案

#### 4.1 问题：`npm` 或 `npx` 命令无法识别

* **问题**：在刚开始使用命令时，系统提示 `npm` 或 `npx` 命令无法识别。
* **原因**：这通常是因为没有正确安装 Node.js，或者在安装 Node.js 时没有勾选将其添加到系统 `PATH` 中。
* **解决方案**：

  1. 确保安装了 Node.js，并且勾选了“Add to PATH”。
  2. 如果安装 Node.js 后仍然无法识别命令，可以尝试手动将 `Node.js` 的安装路径添加到环境变量中（具体路径一般为 `C:\Program Files\nodejs\`）。

#### 4.2 问题：Expo CLI 的全局版本已弃用

* **问题**：运行 `expo init` 时，看到警告提示 `expo-cli` 全局版本已弃用。
* **解决方案**：

  * Expo 现在推荐使用 `npx` 来运行项目中的本地 Expo CLI，因此我们在项目中使用 `npx expo start` 来启动开发服务器。

#### 4.3 问题：Git 未安装或未正确配置

* **问题**：在尝试使用 `git clone` 命令时，提示 `'git' 不是内部或外部命令，也不是可运行的程序或批处理文件`。
* **解决方案**：

  * 安装 Git 并确保在安装过程中选择了“Git from the command line”选项。
  * 确保 Git 安装路径正确添加到了系统环境变量中。

---

### 5. 总结

1. **安装 Node.js** 和 **Git**。
2. 使用 `npx` 来初始化和运行 Expo 项目，而不是使用已弃用的全局 `expo-cli`。
3. 使用 `expo start` 启动开发服务器，并通过 **Expo Go** 应用在手机上查看实时效果。

在这个过程中，我们遇到了关于 Node.js、Git 和 Expo CLI 的一些问题，并通过调整配置或更换命令解决了这些问题。希望这份环境配置指南能帮助你顺利完成开发环境的设置，并顺利开始你的前端开发工作。
