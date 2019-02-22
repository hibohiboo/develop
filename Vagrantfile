# ansibleインストール用shell
$ansible_install = <<SHELL
  if ! type virtualenv > /dev/null 2>&1; then
    # rootユーザとして実行されるためsudo不要
    sudo apt-get update
    sudo apt-get -y install curl
    sudo apt-get -y install libffi-dev libssl-dev python-pip
    sudo pip install --upgrade pip
    sudo pip install virtualenv

    # vagrantユーザとしてvirtualenvとansibleをインストール
    su -c "source /vagrant/provision/bash/install_ansible.sh" vagrant
  fi
SHELL

# virtual machine設定
Vagrant.configure(2) do |config|
  # 使用するディストリビューションのボックスの設定
  config.vm.box = "bento/ubuntu-18.04"
  # 下の公式はボックスサイズが10Gしかない。10Gくらいすぐだし、増やすのも面倒。64Gあるbentoを使う。
  # config.vm.box = "ubuntu/bionic64"
  # ネットワーク設定。
  # 繋がらないときは/etc/network/interfaces を確認。enp0s8に設定してやる。
  # auto enp0s8
  # iface enp0s8 inet static
  #       address 192.168.50.10
  #       netmask 255.255.255.0
  # sudo ifconfig enp0s8 192.168.50.10
  config.vm.network "private_network", ip: "192.168.50.10"

  # SQL Server
  config.vm.network "forwarded_port", guest: 9292, host: 9292

  # Google AOuth
  config.vm.network "forwarded_port", guest: 9005, host: 9005

  # 共有するフォルダの設定
  # config.vm.synced_folder 'angular2', '/home/vagrant/angular2'
  
  # 使用するメモリ容量を変更。
  # デフォルトだと512で少ないためdockerのbuildが失敗しやすい
  config.vm.provider "virtualbox" do |vm|
    # メモリを設定
    vm.memory = 8192
    # Vagrant1.8から利用出来るLinked Cloneをオンにする。
    vm.linked_clone = true

    vm.customize [ "modifyvm", :id, "--cpus", "2", "--ioapic", "on"]
    # ↓起動が止まるときの確認用
    # vm.gui = true
  end

  # vagrant provision を行ったときに以下のエラーが出る対策
  # mesg: ttyname failed: Inappropriate ioctl for device
  # config.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
  
  # ansibleをインストール
  config.vm.provision "shell", inline: $ansible_install
  # ansibleを実行
  config.vm.provision "shell", inline: <<-SHELL
    # timezoneを日本に変更
    timedatectl set-timezone Asia/Tokyo
    # virtualenv起動
    source /home/vagrant/venv/bin/activate
    # provision 実行
    # 失敗した場合は vagrant up後に vagrant provision
    # それでも失敗した場合は、windows再起動後にもう一度vagrant up vagrant provision
    ANSIBLE_CONFIG=/vagrant/provision/.ansible.cfg ansible-playbook -i /vagrant/provision/playbooks/inventory/hosts /vagrant/provision/playbooks/site.yml -c local -v
  SHELL
end
