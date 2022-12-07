import fs from 'fs';

class FileTree {
  public rootNode: FileNode

  constructor(commands: string[]) {
    this.rootNode = new FileNode('/')
    let curNode: FileNode = this.rootNode

    commands.forEach((command) => {
      let parts = command.split(' ')

      if (command.startsWith("$ cd")) {
        let newDirectory = parts.slice(-1)[0]

        if (newDirectory === '..' && curNode.parent) {
          curNode = curNode.parent
        }
        else if (newDirectory === '/') {
          curNode = this.rootNode
        }
        else {
          let dir = new FileNode(`${curNode.path}${newDirectory}/`, curNode)
          curNode.addChild(dir)
          curNode = dir
        }
      } else if (Number(parts[0])) {
        let file = new FileNode(`${curNode.path}${parts[1]}`, curNode, Number(parts[0]))
        curNode.addChild(file)
      }
    })
  }
}

class FileNode {
  public parent: FileNode | undefined
  public children: FileNode[] = []
  public path: string
  public size: number
  public isDir: Boolean = false

  constructor(path: string, parent?: FileNode, size?: number) {
    this.parent = parent
    this.path = path
    this.size = size || 0
    if (this.size === 0) { this.isDir = true }
  }

  public addChild(child: FileNode) {
    this.children.push(child)
  }

  public populateDirSizes() {
    this.children.forEach((child) => {
      if (child.children.length > 0) {
        child.populateDirSizes()
        this.size += child.size
      } else {
        this.size += child.size
      }
    })
  }

  public getDirSizes(myDict: { [name: string]: number }) {
    if (this.isDir) {
      myDict[this.path] = this.size
    }
    this.children.forEach((child) => {
      if (this.isDir) {
        child.getDirSizes(myDict)
      }
    })
  }

  public getDirNodes(dirs: FileNode[]): FileNode[] {
    if (this.isDir) {
      dirs.push(this)
    }
    this.children.forEach((child) => {
      if (this.isDir) {
        child.getDirNodes(dirs)
      }
    })

    return dirs
  }
}

function main() {
  let commands = fs.readFileSync('./07/input.txt', 'utf-8').split('\n')
  let fileTree = new FileTree(commands)

  fileTree.rootNode.populateDirSizes()
  let dict: { [name: string]: number } = {}
  fileTree.rootNode.getDirSizes(dict)

  let sumDirectorySizes = 0
  for (const [key, value] of Object.entries(dict)) {
    if (value <= 100000) {
      sumDirectorySizes += value
    }
  }
  console.log(`problem1: ${sumDirectorySizes}`)

  const totalDiskSize = 70000000
  const existingFreeSpace = totalDiskSize - fileTree.rootNode.size
  const neededDiskSpace = 30000000
  const minFileSizeToDel = neededDiskSpace - existingFreeSpace

  let dirs = new Array<FileNode>
  dirs = fileTree.rootNode.getDirNodes(dirs)
  dirs = dirs.filter((dir) => dir.size >= minFileSizeToDel)
  dirs.sort((a, b) => (a.size - b.size))
  console.log(`problem2: ${dirs[0].path}: ${dirs[0].size}`)
}

main()
