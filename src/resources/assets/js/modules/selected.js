export default {
    methods: {
        /*                Item                */
        selectFirst() {
            this.$nextTick(() => {
                this.scrollToFile(this.getElementByIndex(0))
            })
        },
        setSelected(file, index, e = null) {
            // select with shift
            if (e && e.shiftKey) {
                this.bulkSelect = true
                this.bulkList = []

                // forward
                let begin = this.currentFileIndex
                let end = index
                let dir = 'forward'

                // backward
                if (begin > index) {
                    begin = index
                    end = this.currentFileIndex
                    dir = 'backward'
                }

                let indexList = this.getIndexRange(begin, end)

                indexList.map((i) => {
                    this.getElementByIndex(i).click()
                })

                // to have the same expected pattern as normal shift + click
                if (dir == 'forward') {
                    this.selectedFile = this.bulkList[0]
                    this.currentFileIndex = indexList[0]
                } else {
                    this.selectedFile = this.bulkList[this.bulkItemsCount - 1]
                    this.currentFileIndex = indexList[indexList.length - 1]
                }

                return
            }

            // normal selection
            this.selectedFile = file
            this.currentFileIndex = index
            this.lazyImageActivate(index)

            // bulk selection
            if (this.isBulkSelecting()) {
                this.pushtoBulkList(file)
            }
        },
        selectedFileIs(val) {
            if (this.selectedFile !== null) {
                return this.fileTypeIs(this.selectedFile, val)
            }
        },
        dbltap() {
            if (!this.isBulkSelecting()) {
                if (this.selectedFileIs('image') || this.selectedFileIs('pdf') || this.selectedFileIs('text')) {
                    return this.toggleModal('preview_modal')
                }

                if (this.selectedFileIs('audio') || this.selectedFileIs('video')) {
                    return this.playMedia()
                }

                this.openFolder(this.selectedFile)
            }
        },
        playMedia() {
            let player = this.$refs.player

            if (player) {
                return player.paused
                    ? player.play()
                    : player.pause()
            }
        },

        /*                Folder                */
        openFolder(file) {
            if (!this.isBulkSelecting() && this.fileTypeIs(file, 'folder')) {
                this.folders.push(file.name)
                this.getFiles(this.folders).then(() => {
                    this.updatePageUrl()
                })
            }
        },
        goToFolder(index) {
            if (!this.isBulkSelecting()) {
                let prev_folder_name = this.folders[index]

                this.folders = this.folders.splice(0, index)
                this.getFiles(this.folders, prev_folder_name).then(() => {
                    this.updatePageUrl()
                })
            }
        },
        goToPrevFolder() {
            let length = this.folders.length

            return length == 0
                ? false
                : this.goToFolder(length - 1)
        },

        /*                Navigation                */
        navigation(e) {
            let key = keycode(e)

            // go to prev item
            if (key == 'left' || key == 'up') {
                e.preventDefault()
                this.goToPrev()
            }

            // go to next item
            if (key == 'right' || key == 'down') {
                e.preventDefault()
                this.goToNext()
            }

            // go to last item
            if (key == 'end') {
                e.preventDefault()
                this.imageSlideDirection = 'next'

                let last = this.filesList.length - 1
                this.scrollToFile(this.getElementByIndex(last))
            }

            // go to first item
            if (key == 'home') {
                e.preventDefault()
                this.imageSlideDirection = 'prev'
                this.scrollToFile(this.getElementByIndex(0))
            }

            // toggle modal off
            if (
                this.isActiveModal('preview_modal') &&
                !(
                    this.selectedFileIs('image') ||
                    this.selectedFileIs('pdf') ||
                    this.selectedFileIs('text')
                )
            ) {
                this.toggleModal()
            }
        },
        goToPrev() {
            let curSelectedIndex = this.currentFileIndex

            if (curSelectedIndex !== 0) {
                this.imageSlideDirection = 'prev'
                this.scrollToFile(this.getElementByIndex(curSelectedIndex - 1))
            }
        },
        goToNext() {
            let curSelectedIndex = this.currentFileIndex

            if (curSelectedIndex < this.allItemsCount - 1) {
                this.imageSlideDirection = 'next'
                this.scrollToFile(this.getElementByIndex(curSelectedIndex + 1))
            }
        },
        scrollToFile(file) {
            if (file) {
                file.click()

                this.$nextTick(() => {
                    this.$nextTick(() => {
                        let container = this.$refs['__stack-files'].$el
                        let count = file.offsetTop - container.scrollTop - 20
                        container.scrollBy({top: count, left: 0, behavior: 'smooth'})

                        // when scrollBy() doesnt work
                        if (!(container.scrollHeight > container.clientHeight)) {
                            file.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'end'})
                        }
                    })
                })
            }
        }
    }
}