export default {
    computed: {
        allFiles() {
            if (this.filteredItemsCount) {
                return this.filterdList
            }

            return this.files.items
        },
        filteredItemsCount() {
            if (typeof this.filterdList !== 'undefined' && this.filterdList.length > 0) {
                return this.filterdList.length
            }
        },
        allItemsCount() {
            if (typeof this.allFiles !== 'undefined' && this.allFiles.length > 0) {
                return this.allFiles.length
            }
        },
        filesList() {
            return this.$refs.filesList.$el.children
        },
        bulkItemsCount() {
            if (typeof this.bulkList !== 'undefined' && this.bulkList.length > 0) {
                return this.bulkList.length
            }
        },
        uploadPanelImg() {
            if (this.uploadToggle) {
                let list = this.uploadPanelImgList
                let url = list[Math.floor(Math.random() * list.length)]

                return {
                    'background-image': `url("${url}")`
                }
            }
        },

        // this is made so we can still use move/delete
        // incase we have multiple files selected
        // and one or more of them is locked
        bulkListFilter() {
            return this.lockedList.length
                ? this.bulkList.filter((e) => {return !this.lockedList.includes(e.path)})
                : this.bulkList
        }
    }
}
