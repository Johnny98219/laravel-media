export default {
    methods: {
        btnFilter(val) {
            if (val == 'all') {
                return this.filterdList.length
            }

            return this.files.items.some((item) => {
                return this.fileTypeIs(item, val)
            })
        },
        filterNameIs(val) {
            return this.currentFilterName == val
        },
        fileTypeIs(item, val) {
            if (val == 'text') {
                if (!item.type.includes('folder') &&
                    !item.type.includes('image') &&
                    !item.type.includes('video') &&
                    !item.type.includes('audio') &&
                    !item.type.includes('pdf')) {
                    return true
                }
            }

            return item.type.includes(val)
        },
        showFilesOfType(val) {
            if (this.currentFilterName == val) {
                return false
            }

            if (val == 'all') {
                this.resetInput('currentFilterName')
            } else {
                this.filterdList = this.files.items.filter((item) => {
                    if (val == 'text') {
                        return this.fileTypeIs(item, 'text') || this.fileTypeIs(item, 'pdf')
                    }

                    return this.fileTypeIs(item, val)
                })

                this.currentFilterName = val
            }

            if (!this.isBulkSelecting()) {
                this.clearSelected()
                this.selectFirst()
            }

            if (this.searchFor) {
                this.updateSearchCount()
            }
        },
        filterDirList(dir) {
            // dont show dirs that have similarity with selected item(s)
            if (this.bulkItemsCount) {
                if (this.bulkList.filter((e) => dir.match(`(/?)${e.name}(/?)`)).length > 0) {
                    return false
                }

                return true
            }

            return this.selectedFile && !dir.includes(this.selectedFile.name)
        },

        /*                Search                */
        updateSearchCount() {
            let oldCount = this.searchItemsCount

            this.$nextTick(() => {
                this.searchItemsCount = parseInt($('#files li').length)

                if (this.searchItemsCount == 0 && oldCount == 0) {
                    return
                }

                if (this.searchItemsCount == 0) {
                    return this.noFiles('show')
                }

                this.noFiles('hide')
            })
        },
        updateFoundCount(count) {
            if (this.searchFor) {
                this.searchItemsCount = parseInt(this.searchItemsCount - count)
            }
        }
    }
}
