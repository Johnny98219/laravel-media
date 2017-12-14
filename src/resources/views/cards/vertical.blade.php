<div class="card" :class="{'pdf': selectedFileIs('pdf') || selectedFileIs('text')}">
    <v-touch class="card-image"
        @swiperight="goToPrev()"
        @swipeleft="goToNext()">

        <template v-if="selectedFileIs('pdf') || selectedFileIs('text')">
            <object :data="selectedFile.path" :type="selectedFile.type" width="100%" height="100%">
               <p v-if="selectedFileIs('pdf')">{{ trans('MediaManager::messages.pdf') }}</p>
            </object>
        </template>

        <template v-else>
            <a :href="selectedFile.path" target="_blank" class="image"><img :src="selectedFile.path"></a>
        </template>
    </v-touch>

    <div class="card-content">
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <div class="media">
                        {{-- lock / unlock --}}
                        <div class="media-left link">
                            <span class="icon is-large"
                                :class="IsInLockedList(selectedFile) ? 'is-danger' : 'is-success'"
                                :title="IsInLockedList(selectedFile) ? '{{ trans('MediaManager::messages.unlock') }}': '{{ trans('MediaManager::messages.lock') }}'"
                                v-tippy="{arrow: true, hideOnClick: false}"
                                @click="toggleLock(selectedFile)">
                                <span class="icon is-small">
                                    <icon :name="IsInLockedList(selectedFile) ? 'unlock' : 'lock'" scale="1.5"></icon>
                                </span>
                            </span>
                        </div>

                        <div class="media-content">
                            {{-- name --}}
                            <p class="title">
                                <span class="link"
                                    @click="copyLink(selectedFile.path)"
                                    :title="linkCopied ? '{{ trans('MediaManager::messages.copied') }}' : '{{ trans('MediaManager::messages.copy_to_cp') }}'"
                                    v-tippy="{arrow: true, hideOnClick: false, followCursor: true}"
                                    @hidden="linkCopied = false">
                                    @{{ selectedFile.name }}
                                </span>

                                {{-- pdf open --}}
                                <a v-if="selectedFileIs('pdf')" :href="selectedFile.path" class="has-text-dark" target="_blank">
                                    <icon name="eye"></icon>
                                </a>
                            </p>

                            {{-- date --}}
                            <p class="heading">@{{ selectedFile.last_modified_formated }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="level-right">
                <div class="level-item has-text-centered">
                    <div>
                        {{-- download --}}
                        <button class="button btn-plain" @click.prevent="saveFile(selectedFile)"
                            v-tippy title="{{ trans('MediaManager::messages.download_file') }}">
                            <span class="icon has-text-black"><icon name="download" scale="3"></icon></span>
                        </button>

                        {{-- size --}}
                        <p>@{{ getFileSize(selectedFile.size) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="card-footer">
        {{-- move --}}
        <div class="card-footer-item">
            <button class="button btn-plain is-fullwidth"
                v-multi-ref="'move'"
                :disabled="mv_dl() || !checkForFolders"
                @click="moveItem()">
                <span class="icon is-small"><icon name="share"></icon></span>
                <span>{{ trans('MediaManager::messages.move') }}</span>
            </button>
        </div>

        {{-- rename --}}
        <div class="card-footer-item">
            <button class="button btn-plain is-fullwidth"
                :disabled="!selectedFile || IsInLockedList(selectedFile)"
                v-if="!isBulkSelecting()"
                @click="renameItem()">
                <span class="icon is-small"><icon name="i-cursor"></icon></span>
                <span>{{ trans('MediaManager::messages.rename') }}</span>
            </button>
        </div>

        {{-- delete --}}
        <div class="card-footer-item">
            <button class="button btn-plain is-fullwidth"
                v-multi-ref="'delete'"
                :disabled="mv_dl()"
                @click="deleteItem()">
                <span class="icon is-small"><icon name="trash"></icon></span>
                <span>{{ trans('MediaManager::messages.delete') }}</span>
            </button>
        </div>
      </footer>
</div>
