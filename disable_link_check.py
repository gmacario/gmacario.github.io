# ==========================
# disable_link_check.py
# ==========================
import os

subdirs = ["_drafts", "_posts"]

for dir in subdirs:
    path = os.path.join(".", dir)

    # List files
    for [parent_dir, _, files] in os.walk(path):
        for file_name in files:
            if file_name.endswith(".md"):
                # Markdown file found
                src_file_path = os.path.join(parent_dir, file_name)
                temp_file_path = os.path.join(parent_dir, file_name + ".tmp")

                # Open a temp file
                with open(temp_file_path, "w+", encoding="iso-8859-1") as tmp_file:
                    # Open the source file
                    with open(src_file_path, "r+", encoding="iso-8859-1") as src_file:
                        meta_cnt = 0
                        check_next_line = False
                        print(f"Processing {file_name}")
                        # Read source file line by line
                        for line in src_file.readlines():
                            # Prepare to write the current line
                            print_ln = line

                            # Check for metadata block
                            if "---" in line:
                                meta_cnt += 1

                            # After the second metadata tag...
                            if meta_cnt == 2:
                                if check_next_line:
                                    # Is there already a tag?
                                    if (
                                        "<!-- markdown-link-check-disable -->"
                                        not in line
                                    ):
                                        print("Adding link disable tag")
                                        print_ln = f"<!-- markdown-link-check-disable -->\n{print_ln}"
                                    # Avoid the check again
                                    meta_cnt += 1
                                else:
                                    # Check next line if there is already a tag
                                    check_next_line = True

                            if "<!-- EOF -->" in line:
                                print("Adding link enable tag")
                                print_ln = (
                                    f"<!-- markdown-link-check-enable -->\n{print_ln}"
                                )

                            # Write the current line
                            tmp_file.write(print_ln)

                # Delete source file
                os.remove(src_file_path)
                # Rename Processed file
                os.rename(temp_file_path, src_file_path)

# EOF
